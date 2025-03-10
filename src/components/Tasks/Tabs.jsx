import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Tabs = ({ tabs, setSelected, children }) => {
  // console.log('children', children);
  return (
    <div className='w-full px-1 sm:px-0'>
      <TabGroup>
        <TabList className={'flex space-x-6 rounded-xl p-1'}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  'w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white',
                  selected
                    ? 'text-purple-700 border-b-2 border-purple-600'
                    : 'text-gray-800 hover:text-purple-800'
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </TabList>
        <TabPanels className='w-full mt-2'>{children}</TabPanels>
      </TabGroup>
    </div>
  );
};

export default Tabs;
