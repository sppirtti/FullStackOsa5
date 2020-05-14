const user = {
  name: 'Testi Eesti',
  username: 'teesti',
  password: 'salasana'
}

describe('Blog app', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')

    const user = {
      name: 'Testi Eesti',
      username: 'teesti',
      password: 'salasana'
    }

  })


  it('frontpage is loginpage', function () {
    cy.contains('LOGIN TO BLOGLIST')

  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginbutton').click()

      cy.contains('Testi Eesti logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type("VAARASANA")
      cy.get('#loginbutton').click()

      cy.contains('wrong credentials')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginbutton').click()
    })

    it('A blog can be created', function () {
      cy.contains('logged in')
      cy.contains('Add new Blog').click()
      /*togglablelle ei onnistunut perus ID asetus*/
      cy.get('#title').type('CypressTestingFun')
      cy.get('#author').type('Testi Eesti')
      cy.get('#url').type('Testingsingins.gg')

      cy.get('#createblogbutton').click()
  
    })
  })


})