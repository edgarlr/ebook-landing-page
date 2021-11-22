# EBook Landing Page
Ebook lading page site for InDebted Assestment

## Adding more ebooks
Currently the project is mocking an API data response in [`lib/data.json`](https://github.com/edgarlr/ebook-landing-page/blob/main/lib/data.json). Adding more ebooks pages is as simple as adding a new object inside the array with the following structure. In a deeper integreation, all these content could be managed from a CMS.

```json
  {
    "title": "<string> - Main title of the EBook", 
    "slug": "<string> - Will be used in the page url", 
    "short_description": "<string> - Displayed below the main headline, Will also be used in the SEO", 
    "share_image": "<string> - OG Image used for SEO",
    "cover": "<string> - Cover of the file",
    "file_url": "<string> - File url",
    "long_description": "<string> - Displayed in the What's inside section."
  }
```

## Sitemap
The sitemap is also generated dynamically at request time in [`pages/sitemap.xml.tsx`](https://github.com/edgarlr/ebook-landing-page/blob/main/pages/sitemap.xml.tsx) based on the [`lib/data.json`](https://github.com/edgarlr/ebook-landing-page/blob/main/lib/data.json) content.

## Built using:

- Framework: [Next.js](https://nextjs.org)
  - [Tailwind](https://tailwindcss.com/docs)
  - [TypeScript](https://nextjs.org/docs/basic-features/typescript)

- Designed on Figma
  - [Figma File](https://www.figma.com/file/peaqYv9m05r0XqEq0jaSRq/Ebook-Landing-Page-(InDebted-CH)?node-id=0%3A1)

## EBook Note
The original EBook page can be found in: [https://www.designbetter.co/design-engineering-handbook](https://www.designbetter.co/design-engineering-handbook)

## Running Locally

1. Clone this repository
2. Run `yarn install` to install the dependencies
3. Once the dependencies are installed, run `yarn run dev` to start the dev server on `localhost:3000`
