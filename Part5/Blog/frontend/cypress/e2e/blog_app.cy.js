describe('blog app', () => {
  beforeEach(function() {
    localStorage.removeItem('loggedBlogUser')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('')
  })
  it('Log in form is shown', () => {
    cy.contains('Log in to application')
    cy.contains('Username')
    cy.contains('Password')
  })
  describe('Login', () => {
    beforeEach(function() {
      cy.createLogin({username:'root',password:'1234',name:'admin'})
    })
    it('Successful login', () => {
      cy.get('input:first').type('root')
      cy.get('input:last').type('1234')
      cy.get('button').click()
      cy.contains('User admin logged in')
    }) 
    it('Unsuccessful login',() => {
      cy.get('input:first').type('invalid')
      cy.get('input:last').type('invalid')
      cy.get('button').click()
      cy.contains('Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in',()=>{
    beforeEach(function() {
      cy.createLogin({username:'root',password:'1234',name:'admin'})
      cy.login({username:'root',password:'1234'})
      cy.createBlog({
        title:'Test title',
        author:'Test author',
        url:'Test url'
      })
    })
    it('can create blog',()=>{
      cy.contains('create note').click()
      cy.get('input[placeholder=\'Title\']').type('A title')
      cy.get('input[placeholder=\'Author\']').type('An author')
      cy.get('input[placeholder=\'url\']').type('An url')
      cy.contains(/^create$/).click()
      cy.contains('a new blog A title by An author added')
    })
    it('can like a blog',()=>{
      cy.contains('view').click()
      cy.contains(/^like$/).click()
      cy.contains('likes 1')
    })
    it('can delete a blog',()=>{
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('html').should('not.contain','Test title')
    })
    it('cant delete a blog the user did not create',()=>{
      localStorage.removeItem('loggedBlogUser')
      cy.createLogin({username:'newuser',password:'234',name:'peasant'})
      cy.login({username:'newuser',password:'234'})
      cy.contains('view').click()
      cy.get('.blog').contains('delete')
      .and('have.css','display','none')
    })
    it('blogs ordered by likes',()=>{
      cy.createBlog({
        title:'First blog',
        author:'First author',
        url:'First url',
        likes: 10
      })
      cy.createBlog({
        title:'Second blog',
        author:'Second author',
        url:'Second url',
        likes: 3
      })
      cy.get('.blog').eq(0).should('contain','First blog')
      cy.get('.blog').eq(1).should('contain','Second blog')
      cy.get('.blog').eq(2).should('contain','Test title')
    })
  })
})

