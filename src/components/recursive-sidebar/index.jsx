import React from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 10vw;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const List = styled.div`
  list-style: none;

  font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva,
    Arial, sans-serif;
`;

const ListItem = styled.div`
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
`;

const ListItemLabel = styled.span``;

// SidebarItem Component
function SidebarItem({ label, items, depthStep = 10, depth = 1, ...rest }) {
  return (
    <React.Fragment>
      <ListItem {...rest}>
        <ListItemLabel style={{ paddingLeft: depth * depthStep, fontSize: `${1 - (depth / 100 )}rem`, fontWeight: 700 - (100 * depth) }}>{label}</ListItemLabel>
      </ListItem>
      {Array.isArray(items) ? (
        <List>
          {items.map((subItem) => (
            <SidebarItem
              key={subItem.name}
              depth={depth + 1}
              depthStep={depthStep}
              {...subItem}
            />
          ))}
        </List>
      ) : null}
    </React.Fragment>
  );
}

// Sidebar Component
export default function Sidebar({ items, depthStep, depth }) {
  const [listItems, setListItems] = React.useState([]);

  React.useEffect(() => {
    const newItems = items.map((sidebarItem, index) => (
      <SidebarItem
        key={`${sidebarItem.name}${index}`}
        depthStep={depthStep}
        depth={depth}
        {...sidebarItem}
      />
    ));

    console.log(newItems);

    setListItems(newItems);
  }, [items, depthStep, depth]);

  return (
    <Container>
      <List>{listItems}</List>
    </Container>
  );
}
