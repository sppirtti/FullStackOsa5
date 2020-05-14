import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Blogi testaus on rankkaa puuhaa',
    author: 'Testi',
    url: 'renderi.fi',
    likes: 73571
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Blogi testaus on rankkaa puuhaa'
  )
  expect(component.container).toHaveTextContent(
    'Testi'
  )
})


test('show url and ', async () => {
  const blog = {
    title: 'Blogi testaus on rankkaa puuhaa',
    author: 'Testi',
    url: 'renderi.fi',
    likes: 73571
  }

  const component = render(
      <Blog blog={blog} />
  )

  const pressButton = component.container.querySelector('.pressButton')
  fireEvent.click(pressButton)

  expect(component.container).toHaveTextContent(
      'renderi.fi', 73571  )
})