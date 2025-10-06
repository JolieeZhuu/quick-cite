> This project is currently a work in progress!
# Quick Cite: A Citation Machine Browser Extension
A fast way to access a citation machine!

## Overview
Quick Cite is a project I'm currently building because I believe it's a universal experience how time-consuming citing sources is. The issues with some of the citation machines I have used in the past are the ads, the high latency, inaccuracy, or the lack of media variation, like YouTube videos, PDFs, interviews, abstracts, etc. This resulted me in citing my sources by hand, which brought only one advantage: trust that my citation was accurate. I hope that by the end of this project, I am able to create something that generates citations quickly, that users can trust, and that users are satisfied with (in terms of UI/UX and media variation).

## How to install
1. Download the build folder
2. On Google Chrome, go to the Extensions > Manage Extensions in the tool bar
3. In developer mode, click "Load Unpacked" in the top left corner, and upload the build folder
4. Have fun playing with the machine!

## Features
### Current
- Book APA citation: added a very basic book citation generator, where users can look up the top 10 relevant results to their search (by title or author)

### Planned
- **Media variation:** I hope to implement all the other types of media out there (based on Purdue Owl) for BOTH APA and MLA (for reference lists AND in-text citations).
- **Better UI/UX:** I want to improve the colour scheme and make it more efficient for users. I may change my current layout to avoid so many page redirects.
- **Backend:** If my planned implementations work out well, I would also like to add a Flask backend and database to store past citations a user has generated. 
