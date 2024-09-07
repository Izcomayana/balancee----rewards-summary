Balancee Rewards Summary Page

Hi, I'm Israel and this is the cooking process of this yummy food



# Job Application Task - README

## Overview

This application is built using React with TypeScript, and employs various technologies and libraries to provide a seamless and interactive user experience. Below is a comprehensive explanation of the choices made, the architecture, and the features implemented.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For adding static typing to JavaScript, ensuring better code quality and maintainability.

### CSS Frameworks:

- **Tailwind CSS**: For utility-first styling.
- **Shadcn** and **Radix UI**: For additional components and styling.

### Animations:

- **Framer Motion** and **AOS (Animate On Scroll)**: For page transitions and animations.

### Icons:

- **React Icons** and **Hero Icons**: For a range of icons used throughout the application.

### Fonts:

- **Google Fonts**: Specifically the Montserrat font for improved typography.




## Architecture and Structure
The application consists of three main pages:

###  1. Home Page

**Overview**: Displays key metrics such as total earnings, current balance, and total bookings.

**Purpose**: Provides users with a quick summary of their earnings and balance.


### 2. History Page

**Overview**: Shows a detailed history of transactions, including balance, accumulated cashback, service names, booking IDs, dates, and amounts earned.

**Features**:

- Pagination: To handle large amounts of data efficiently.
- Search and Filters: To improve usability and allow users to find specific entries quickly.
- How-To-Use Modal: Provides information on how users can utilize their cashback effectively.


### 3. Cashout Page

**Overview**: Allows users to redeem their rewards through various options.

**Cashout Options**:

- Direct Cashout: Users can choose between bank transfer or discounts on future bookings.
- Bank Transfer: Users fill out a form to withdraw funds, with a history of previous withdrawals displayed in a table.
- Discount on Future Bookings: Use earned cashback as a discount on upcoming bookings.

Promo Codes: Convert cashback into promo codes for future bookings.




## Additional Features:

- **Balance Display**: Shows the available balance and cashback history.
- **Local Storage** and **Backend Integration**: Persist the available balance in local storage and on the backend, ensuring updates whenever cashout options are utilized.





## Data Management
**Local Data Storage**: Utilized a data.json file located in the public folder as a mock backend. This file contains:

- Maximum amount
- Transaction histories
- Cashback histories




## Implementation Details
- **State Management**: State is managed using React’s useState and useEffect hooks to handle user interactions and data fetching.
- **Form Validation**: Ensured form validation on the cashout page to provide a smooth user experience.
- **Performance Optimization**: Implemented pagination, search, and filters to manage and display large sets of data efficiently.




## Future Improvements
- **Enhanced Security**: Integrate real backend services with secure authentication mechanisms.
- **User Experience**: Further improvements in UI/UX based on user feedback.
- **Scalability**: Optimize for scalability as the number of users and transactions increases.




## Conclusion

This application demonstrates proficiency in modern web development practices, including the use of TypeScript for type safety, integration of various libraries for enhanced functionality, and a focus on user experience through thoughtful design and interactive features.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
