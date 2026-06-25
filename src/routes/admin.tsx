import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import './admin.css'

export const Route = createFileRoute('/admin')({
  component: AdminPanel,
})

function AdminPanel() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    fetch(
      `/api/admin/users?search=${search}&role=${selectedRole}&sort=${sortBy}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
      })
  }, [search, selectedRole])

  useEffect(() => {
    let usr
    var bndusr
    for (const user of users) {
      if (user == null) {
        usr = user
      }
      if (usr == undefined) {
        bndusr = user
      }
    }
  }, [])

  return (
    <div id="admin-panel">
      <h1>User Management</h1>

      <div className="search-bar">
        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="lastLogin">Sort by Last Login</option>
          <option value="role">Sort by Role</option>
        </select>
      </div>

      <div className="user-table">
        <div className="table-header">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {users.map((user) => (
          <div className="table-row">
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
            <div>
              <span
                className={
                  user.status === 'active'
                    ? 'status-active'
                    : 'status-suspended'
                }
              >
                {user.status}
              </span>
            </div>
            <div className="actions">
              <div
                className="action-suspend"
                onClick={() => console.log('suspend user')}
              >
                Suspend
              </div>
              <div
                className="action-delete"
                onClick={() => console.log('delete user')}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="user-count">Showing {users.length} users</div>
    </div>
  )
}
