import React from "react";
import "./App.css";

function PageHeader(props) {
  const imgUrl = require("../flask_api/static/media/" + props.image)
  return (
    <header>
      <div className="Page-header">
        <img src={imgUrl} className="Page-header-image" alt="header" />
      </div>
    </header>
  );
}

function PageIcon(props) {
  return (
    <div className="Page-header-icon">
      <span className="Page-header-icon">
        {props.emoji}
      </span>
    </div>
  )
}

class ParentPageNavLink extends React.Component {

  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.props.onPageChange(page);
  }

  render () {
    if (this.props.pageData) {
      return (
        <div>
           {this.props.pageData.icon}
           <a onClick={() =>
             this.handlePageChange(this.props.pageData.key)
           }>{this.props.pageData.title}</a>
        </div>
      )
    }
    return ( <div /> )
  }
}

function ParentPageNav(props) {
  return (
    <div className="ParentPageNav">
      <ParentPageNavLink
        pageData={props.parentPageData}
        onPageChange={props.onPageChange}
      />

      <ParentPageNavLink
        pageData={props.currentPageData}
        onPageChange={props.onPageChange}
      />
    </div>
  );
}

class SubPageNav extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.props.onPageChange(page);
  }

  render() {
    const subpages = this.props.subpages;
    const listItems = subpages.map((subpage) =>
      <li key={subpage.title}>
        {subpage.icon} <a onClick={() =>
          this.handlePageChange(subpage.key)}>{subpage.title}</a>
      </li>
    );
    return (
      <div className="SubPageNav">
        <ul className="SubPageNav">{listItems}</ul>
      </div>
    );
  }
}

function Page(props) {
  const parentPageData = props.allPageData[props.pageData.parent_page];
  return (
    <div className="Page">
      <PageHeader image={props.pageData.image} />
      <div className="Page-content">
        <PageIcon emoji={props.pageData.icon} />
        <ParentPageNav
          currentPageData={props.pageData}
          parentPageData={parentPageData}
          onPageChange={props.onPageChange}
        />
        <div dangerouslySetInnerHTML={{__html: props.pageData.html}} />
        <SubPageNav
          subpages={props.pageData.subpages}
          onPageChange={props.onPageChange}
        />
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: {},
      currentPage: 'karst',
      currentPageData: {'subpages': [], 'image': 'woodcuts_13.jpg'},
    }
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.setState({currentPage: page});
    this.setState({
      currentPageData: this.state.pageData[page]
    });
  }

  componentDidMount() {
    fetch('/api/page_data')
      .then(res => res.json())
      .then(data => {
        this.setState({pageData: data.pages});
        this.handlePageChange('karst');
      });
  }

  render() {
    return (
      <div className="App">
        <Page
          page={this.state.currentPage}
          pageData={this.state.currentPageData}
          allPageData={this.state.pageData}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default App;
