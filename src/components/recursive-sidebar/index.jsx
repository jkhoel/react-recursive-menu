import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
  list-style: none;

  font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
`;

const ListItem = styled.li`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Sidebar() {
  return (
    <List>
      <ListItem>Home</ListItem>
      <ListItem>Billing</ListItem>
      <ListItem>Settings</ListItem>
    </List>
  )
}