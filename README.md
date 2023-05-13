<h1>SEAL Code Challenge</h1>

  <p>I decided to use Next.js to develop this app since it's a framework that includes both frontend (React) and backend. As for the web services I decided to use the S3 bucket from AWS.<p>

<h2>Composition</h2>
  <p>The site is composed of:</p>
  <li>Upload, landing page to upload files;</li>
  <li>List, content page with all the files of the bucket.</li><br/>
  
  <p>I could have implemented an app with only one view but I wanted to show the difference between a page implemented with CSR (Client-side Rendering) and one with the interesting Next.js feature of SSR (Server-side Rendering), ideal in this case to keep the data always updated since the page in generated in the server on each request.</p>
  <p>I decided to go for a basic design with the help of Bootstrap components since it seems to me that the real focus of this challenge was the backend part.</p>
    
  <h2>Features</h2>
  <p>The user is able to upload one or multiple files of type:</p>
  <li>PDF,</li>
  <li>Excel,</li>
  <li>Word,</li>
  <li>txt,</li>
  <li>images.</li><br/>
  <p>The user is able to display a list of all the uploaded files, with different icons depending on the file type, and if they are images, also a preview.</p>
  <p>The user is able to download one or multiple files.</p>
  <p>The user is able to create a download link with expiration time (three options of expiration time) to share publicly.</p>
  <br/><br/>
  
  <p>It could be useful to implement a registration/login feature to protect the files and add specific files to favourites. Also to divide the list into categories.</p>
 

<h2>Technology used</h2>
  <div style="display: flex, flex-direction: row">
    <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3220588/nextjs-icon-md.png" style="width: 40px" />
    <img src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" style="width: 40px"/>
    <img src="https://static-00.iconduck.com/assets.00/aws-icon-512x512-hniukvcn.png" style="width: 40px"/>
    <img src="https://cdn.iconscout.com/icon/free/png-256/free-amazon-s3-2968702-2464706.png" style="width: 40px"/>
    <img src="https://cdn-icons-png.flaticon.com/512/5968/5968672.png" style="width: 40px"/>
    <img src="https://static-00.iconduck.com/assets.00/moment-js-icon-1024x1024-44e1nhfw.png" style="width: 40px"/>
  </div>
