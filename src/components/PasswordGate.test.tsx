import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PasswordGate } from './PasswordGate'

describe('PasswordGate', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('blocks content until the correct password is submitted', async () => {
    const user = userEvent.setup()

    render(
      <PasswordGate password="forFun">
        <div>受保护内容</div>
      </PasswordGate>,
    )

    expect(screen.getByRole('heading', { name: '请输入访问密码' })).toBeInTheDocument()
    expect(screen.queryByText('受保护内容')).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('访问密码'), 'wrong-pass')
    await user.click(screen.getByRole('button', { name: '进入' }))

    expect(screen.getByText('密码不正确，请重试。')).toBeInTheDocument()
    expect(screen.queryByText('受保护内容')).not.toBeInTheDocument()

    await user.clear(screen.getByLabelText('访问密码'))
    await user.type(screen.getByLabelText('访问密码'), 'forFun')
    await user.click(screen.getByRole('button', { name: '进入' }))

    expect(screen.getByText('受保护内容')).toBeInTheDocument()
    expect(window.sessionStorage.getItem('psychology-reader-unlocked')).toBe('1')
  })

  it('restores the unlocked state from sessionStorage', () => {
    window.sessionStorage.setItem('psychology-reader-unlocked', '1')

    render(
      <PasswordGate password="forFun">
        <div>受保护内容</div>
      </PasswordGate>,
    )

    expect(screen.getByText('受保护内容')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '请输入访问密码' })).not.toBeInTheDocument()
  })
})
