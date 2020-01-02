import React from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 10vw;
  border: 1px solid rgba(0, 0, 0, 0.1);
  user-select: none;
`;

const List = styled.div`
  list-style: none;
  font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva,
    Arial, sans-serif;
`;

const ListItem = styled.div`
  cursor: pointer;
  border-left: 2px solid transparent;

  &:hover {
    background-color: #00000010;
    border-left: 2px solid black;
  }
`;

const ListItemLabel = styled.span`
  padding-left: ${(props) => props.padding}px;
`;

const Divider = styled.hr`
  margin: 6px 0;

  height: 1;
  border: 'none';
  flex-shrink: 0;
`;

const Collapse = styled.div((props) => ({
  display: props.collapsed ? 'none' : 'block'
}));

const BeforeIcon = styled.span`
  font-family: 'Lucida Mono', 'Courier New', Courier, monospace;
  font-size: 1.2rem;
  margin-right: 0.25rem;
`;

// SidebarItem Component
function SidebarItem({
  depthStep = 10,
  depth = 1,
  expanded = false,
  item,
  ...rest
}) {
  const [collapsed, setCollapsed] = React.useState(true);
  const { label, items, Icon, onClick: onClickProp } = item;

  function toggleCollapse() {
    setCollapsed((prevValue) => !prevValue);
  }

  function onClick(e) {
    if (Array.isArray(items)) {
      toggleCollapse();
    }
    if (onClickProp) {
      onClickProp(e, item);
    }
  }

  let beforeContent = <BeforeIcon />;
  if (Array.isArray(items) && items.length) {
    beforeContent = collapsed ? (
      <BeforeIcon>+</BeforeIcon>
    ) : (
      <BeforeIcon>-</BeforeIcon>
    );
  }

  return (
    <React.Fragment>
      <ListItem onClick={onClick} {...rest}>
      <ListItemLabel content={beforeContent} padding={depth * depthStep}>
      {beforeContent}
          {label}
        </ListItemLabel>
      </ListItem>
      <Collapse collapsed={collapsed}>
        {Array.isArray(items) ? (
          <List>
            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === 'divider' ? (
                  <Divider style={{ margin: '6px 0' }} />
                ) : (
                  <SidebarItem
                    key={subItem.name}
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </React.Fragment>
  );
}

// Sidebar Component
export default function Sidebar({ items, depthStep, depth, expanded }) {
  const [listItems, setListItems] = React.useState([]);

  React.useEffect(() => {
    const newItems = items.map((sidebarItem, index) => (
      <React.Fragment key={`${sidebarItem.name}${index}`}>
        {sidebarItem === 'divider' ? (
          <Divider style={{ margin: '6px 0' }} />
        ) : (
          <SidebarItem
            depthStep={depthStep}
            depth={depth}
            expanded={expanded}
            item={sidebarItem}
          />
        )}
      </React.Fragment>
    ));

    setListItems(newItems);
  }, [items, depthStep, depth]);

  return (
    <Container>
      <List>{listItems}</List>
    </Container>
  );
}
