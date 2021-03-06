import React from 'react';

import Sidebar from './recursive-sidebar';

function onClick(e, item) {
  window.alert(JSON.stringify(item, null, 2));
}

const MenuItems = [
  { name: 'home', label: 'Home' },
  {
    name: 'billing',
    label: 'Billing',
    items: [
      { name: 'statements', label: 'Statements', onClick },
      { name: 'reports', label: 'Reports', onClick }
    ]
  },
  'divider',
  {
    name: 'settings',
    label: 'Settings',
    items: [
      { name: 'profile', label: 'Profile' },
      { name: 'insurance', label: 'Insurance', onClick },
      'divider',
      {
        name: 'notifications',
        label: 'Notifications',
        items: [
          { name: 'email', label: 'Email', onClick },
          {
            name: 'desktop',
            label: 'Desktop',
            items: [
              { name: 'schedule', label: 'Schedule' },
              { name: 'frequency', label: 'Frequency' }
            ]
          },
          { name: 'sms', label: 'SMS' }
        ]
      }
    ]
  }
];

// Helper function to generate random strings
function randomStr(len, arr) {
  var ans = '';
  for (var i = len; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
}

// App Component
export default function App() {
  const [items, setItems] = React.useState(MenuItems);

  const addMenuItem = () => {
    const str = randomStr(8, '12345abcde');
    setItems((prev) => [...prev, { name: str, label: str }]);
  };

  return (
    <div>
      <div style={{ position: 'absolute', right: 0 }}>
        <button onClick={addMenuItem}>Add Menu Item</button>
      </div>
      <Sidebar items={items} />
    </div>
  );
}
