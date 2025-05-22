import '@testing-library/jest-dom'
import 'jest-extended'

// Mock next/image
/* jest.mock('next/image', () => ({
  __esModule: true,
  default: (props = {}) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="" {...props} />
  },
})) */

// Mock next/font
/* jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-inter-font',
  }),
})) */