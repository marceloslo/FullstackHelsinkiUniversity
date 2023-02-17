// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('createLogin', ({ username, password, name }) => {
    const credentials = {
        username : username,
        password : password,
        name : name
    }
    cy.request('POST', 'http://localhost:3003/api/users', credentials).then(({body}) => {})
})

Cypress.Commands.add('login', ({ username, password }) => {
    const credentials = {
        username : username,
        password : password
    }
    cy.request('POST', 'http://localhost:3003/api/login', credentials).then(response => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
        cy.visit('')
      })
})
Cypress.Commands.add('createBlog', (body) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: body,
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
      }
    }).then(response=>{
        cy.visit('')
    })
})