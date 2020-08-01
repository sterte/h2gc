import React from 'react';


function About(props) {


  return(
      <div className="container">
      <div className="row">
      <ol className="col-12 breadcrumb">
      <li className="breadcrumb-item"><a href="./index.html">Home</a></li>
      <li className="breadcrumb-item active">About</li>
      </ol>
      <div className="col-12">
      <h2>About</h2>
      <hr/>
      </div>
      </div>

      <div className="row row-content align-items-center">
      <div className="col-12">
      <h3>What's this...</h3>
      <p>The main idea behind Hitchickers' guide to Cinema is to offer a strightforward way to make complex searches on the <a href="http://www.imdb.com" target="_blank" rel="noopener noreferrer">IMDB</a> database via any kind of device.</p>
      <p>It started as a bonus project related to a coursera full-stack javascript development course. The project will be developed in parallel with the course and the new topic that will be tackled.</p>
      <hr/>
      </div>

      <div className="col-12">
      <h3>About me</h3>
      <p>My name is Stefano Arteconi, I am a Ph.D. in computer science at the university of Bologna (Italy), I have more than 10 years experience of software developing and team leading. Unfortunately I never worked in the web/mobile applications domain, so I decided it was time to get a grip of it, joined a <a href="https://www.coursera.org/specializations/full-stack-react" target="_blank" rel="noopener noreferrer">full-stack javascript course on Coursera</a> and started this project in parallel.</p>
      <hr/>
      </div>

      <div className="col-12">
      <h3>More Info</h3>
      <p>If you are interested in more info about the project, you can find the code and documentation repository publicly available on <a href="https://bitbucket.org/sterte/h2gc/src/master/" target="_blank" rel="noopener noreferrer">BitBucket</a>.</p>
      <p>Below you can find a schematic of the history of the project and wanted features.</p>
      </div>
      </div>

      <div className="row row-content align-items-top">
      <div className="col-12">
      <h3>History</h3>
      <div className="table-responsive">
      <table className="table table-bordered table-striped">
      <thead className="thead-dark">
      <tr>
      <th>Date</th>
      <th>What's new</th>
      <th>Expected next features</th>
      <th>Notes</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <th>1/8/20</th>
      <td><ul><li>Firt react app version of person detail component.</li><li>Firt react app version of movie detail component.</li></ul></td>
      <td><ul><li>Next improvement will be regarding backend functionality and actual REST API addition.</li></ul></td>
      <td><ul><li>The website currently runs with a minimal rest api created manually, as a proof of concept for the future development with real REST API.</li><li>Search form are still very rudimental, thy will be dealt with in detail when linking to a becjaend and REST API.</li></ul></td>            
      </tr>
      <tr>
      <th>31/7/20</th>
      <td><ul><li>First proptotype of the website as a react app</li> <li>First react app version of home component</li><li>First react app version of about page</li><li>First react app version of search page</li></ul></td>
      <td><ul><li>Improve movies card structure and contents in the home page</li><li>First react app version of result search page</li><li>Start using actual links with actual data retrieval (i.e. from homepage to movie/person details)</li></ul></td>
      <td><ul><li>A small fake db is been created extracting data manually from IMDb rest api, as a Redux and Fetch testbed.</li><li>Popover buttons still present but still not working (they will probablu disappear).</li></ul></td>            
      </tr>
      <tr>
      <th>29/7/20</th>
      <td><ul><li>Coursera React course finished</li> <li>"Translation" of h2gs into a single page React app proposed as honor grade asssignment</li></ul></td>
      <td></td>
      <td></td>            
      </tr>
      <tr>
      <th>9/7/20</th>
      <td><ul><li>First static version of <i>Search</i> page</li> <li>First static version of <i>Search Result</i> page</li></ul></td>
      <td><ul><li>Various cosmetic fixes</li></ul></td>
      <td><ul><li>The mockup first version is complete, apart form minor cosmetic fixes. The next step are related to the development of the back-end.</li></ul></td>            
      </tr>
      <tr>
      <th>8/7/20</th>
      <td><ul><li>First static version of <i>Movie Detail</i> page</li> <li>First static version of <i>Person Detail</i> page</li></ul></td>
      <td><ul><li>Static version of Basic and Advanced search forms and result pages</li></ul></td>
      <td><ul><li>As a general choice, the page will not be focused on giving exhaustive details, on the contrary it will present summary data and related links to IMDb pages for full data.</li><li>Advanced search form will be a trivial prototype, it might change drastically in the future when database related problems will be tackled</li></ul>.</td>
      </tr>
      <tr>
      <th>7/7/20</th>
      <td><ul><li>First static version of <i>index</i> page</li> <li>First static version of <i>about</i> page</li></ul></td>
      <td><ul><li>Static version of <i>Movie detail</i> page</li> <li>Static version of <i>Person detail</i> page</li></ul></td>
      <td><ul><li>Temporary Info buttons to explain the current status and the goal of the components have been added throughout the pages</li></ul></td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      </div>
      </div>

      
      );
}

export default About;    