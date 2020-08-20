
![Rebound](/src/media/snail-small.png)

# Rebound
## A lightweight react/redux Blog app


Install Rebound to provide yourself with a lightweight, simple to use blogging app.

![Rebound](/readme.png)

Using `react`, `redux`, `react router` frameworks.

Features include:
- Log in and out as the site admin
- Log out as admin
- Change your admin credentials (username/password)
- Publish blog posts with photos
- Delete your previous blog posts
- Edit your previous blog posts
- Create a share link to share the blog post with others
- Print your favourite blog post

Coming Soon:
- Comment section
- Add codeblocks to your blog post
- Add embed Youtube links to your post
- Add links to your post

### `Installation Instructions`
- Clone the repository or Download the zip and extract
- Run `npm install` to install all necessary modules
- Run `npm start` to start the server
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `Settings`
Default login credentials: <br />
`username:` `admin` <br/>
`password:` `admin`

You may change your admin credentials in the Settings page
You may change your avatar photo by swapping out the current file located in `/Src/Media/avatar.jpg`

### `Clearing Data`
In case you need to clear the current blogs and admin data, you may change `CLEAR_DATE` in `index.js` to `true`
After the server recompiles, it is recommended to change `CLEAR_DATE` back to `false`

### `Project Documents`
Project Documents can be found in the /Documents folder found in root.
- Project Proposal
- Technical Diagram
- App Mockup
- Operating Manual

### `Trello`
[Trello Board](https://trello.com/b/W7cc7tov/rebound)
