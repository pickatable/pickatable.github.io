# Pickatable Website

Frontend repository for the Pickatable website.

## Local Development

### Prerequisites
- Mac OS X
- [Homebrew](https://brew.sh/) package manager. Install it with: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

### Installation Steps
1. Install http-server using Homebrew: `brew install http-server`

### Running the Website Locally
1. Open Terminal
2. Navigate to the project directory: `cd path/to/pickatable/website`
3. Start the local server: `http-server`
4. Open your browser and visit: `http://localhost:8080`

The website should now be running locally! 

Note: Keep the Terminal window open while you're working on the site. To stop the server, press `Ctrl + C` in Terminal.

## Project Structure
```
website/
├── index.html              # Home page
├── contact_us.html         # Contact page
├── faqs.html               # FAQs page
├── data.html               # ... page
├── link_redirect.html      # ... page
├── restaurant_viewer.html  # Restaurant viewer page
├── assets/
│   ├── documents/          # Document files
│   ├── fonts/              # Custom fonts
│   ├── icons/              # Icon files (graphic elements, ...)
│   └── images/             # Image files (photos, restaurant logos, ...)
├── components/             # Reusable HTML components
├── css/                    # Stylesheet files
├── js/                     # JavaScript files
└── restaurant_viewer/      # Restaurant Viewer files
```

## Development Guidelines
- HTML files use components from the `components/` directory for reusable elements
- JS functions should be stored in `js/component_name.js` rather than in the HTML file (i.e. `<script>` tag)
- Images are stored in `assets/images/`
- All styling should be done in `css/styles.css`

## Contributing
1. Clone the repository on your local machine
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes
4. Test locally using http-server
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request in GitHub: [https://github.com/pickatable/website/pulls](https://github.com/pickatable/website/pulls)