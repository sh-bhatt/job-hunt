import { Button } from '@radix-ui/themes'
import React from 'react'
import { logout } from '@/server-actions'

export default function LogoutBtn() {
  return (
    <Button onClick={logout}>Logout</Button>
  )
}
