import { useState } from 'react';
import {
  Button,
  Checkbox,
  Combobox,
  Dialog,
  Disclosure,
  DropdownMenu,
  Fieldset,
  Input,
  Listbox,
  Popover,
  RadioGroup,
  Select,
  Switch,
  Tabs,
  Textarea,
  FadeTransition,
  SlideUpTransition,
  ScaleTransition,
} from '../components/ui';
import { ChevronDownIcon, SettingsIcon, UserIcon, MailIcon, CalendarIcon } from 'lucide-react';

export default function Components() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [comboboxValue, setComboboxValue] = useState('');
  const [listboxValue, setListboxValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [radioValue, setRadioValue] = useState('option1');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [transitionShow, setTransitionShow] = useState(false);

  const dropdownItems = [
    { label: 'Profile', onClick: () => console.log('Profile clicked') },
    { label: 'Settings', onClick: () => console.log('Settings clicked') },
    { label: 'Sign out', onClick: () => console.log('Sign out clicked') },
  ];

  const comboboxOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const radioOptions = [
    { value: 'option1', label: 'Option 1', description: 'This is option 1' },
    { value: 'option2', label: 'Option 2', description: 'This is option 2' },
    { value: 'option3', label: 'Option 3', description: 'This is option 3', disabled: true },
  ];

  const tabs = [
    { label: 'Tab 1', content: 'Content for tab 1' },
    { label: 'Tab 2', content: 'Content for tab 2' },
    { label: 'Tab 3', content: 'Content for tab 3', disabled: true },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">UI Components Showcase</h1>
        <p className="text-lg text-gray-600">
          A comprehensive showcase of all modern UI components built with @headlessui/react and Tailwind CSS
        </p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="error">Error</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">States</h3>
            <div className="flex flex-wrap gap-2">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button leftIcon={<SettingsIcon className="h-4 w-4" />}>With Icon</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Components Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Form Components</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Input
              label="Text Input"
              placeholder="Enter your text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="This is a helper text"
            />
            
            <Textarea
              label="Textarea"
              placeholder="Enter your message"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              helperText="This is a multi-line text input"
            />
            
            <Checkbox
              label="Accept terms and conditions"
              checked={checkboxChecked}
              onChange={setCheckboxChecked}
            />
            
            <Switch
              label="Enable notifications"
              checked={switchChecked}
              onChange={setSwitchChecked}
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Radio Group</label>
              <RadioGroup
                options={radioOptions}
                value={radioValue}
                onChange={setRadioValue}
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Select</label>
              <Select
                options={comboboxOptions}
                value={selectValue}
                onChange={setSelectValue}
                placeholder="Choose an option"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Listbox</label>
              <Listbox
                options={comboboxOptions}
                value={listboxValue}
                onChange={setListboxValue}
                placeholder="Select an option"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Combobox</label>
              <Combobox
                options={comboboxOptions}
                value={comboboxValue}
                onChange={(value) => setComboboxValue(value || '')}
                placeholder="Search and select"
              />
            </div>
            
            <Fieldset legend="Fieldset Example" description="This is a fieldset for grouping related form elements">
              <div className="space-y-4">
                <Input
                  label="Field 1"
                  placeholder="Field 1"
                />
                <Input
                  label="Field 2"
                  placeholder="Field 2"
                />
              </div>
            </Fieldset>
          </div>
        </div>
      </section>

      {/* Interactive Components Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Interactive Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Dropdown Menu</h3>
            <DropdownMenu
              items={dropdownItems}
              trigger={
                <>
                  Menu
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </>
              }
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Disclosure</h3>
            <Disclosure title="Click to reveal content">
              <p className="text-gray-600">
                This is the hidden content that appears when you click the disclosure button.
                It can contain any React components or text.
              </p>
            </Disclosure>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Dialog</h3>
            <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Dialog Title"
              description="This is a dialog description"
            >
              <div className="space-y-4">
                <p>This is the dialog content. You can put any components here.</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setDialogOpen(false)}>
                    Confirm
                  </Button>
                </div>
              </div>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Popover</h3>
            <Popover
              trigger={
                <Button variant="ghost">
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Button>
              }
            >
              <div className="space-y-2">
                <p className="font-medium">Popover Content</p>
                <p className="text-sm text-gray-600">This is a popover with custom content.</p>
              </div>
            </Popover>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Tabs</h3>
            <Tabs tabs={tabs} variant="underline" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Transition</h3>
            <div className="space-y-2">
              <Button onClick={() => setTransitionShow(!transitionShow)}>
                {transitionShow ? 'Hide' : 'Show'} Transition
              </Button>
              <FadeTransition show={transitionShow}>
                <div className="p-4 bg-blue-100 text-blue-800 rounded-md">
                  This content fades in and out
                </div>
              </FadeTransition>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Advanced Examples</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Form with Icons</h3>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                leftIcon={<MailIcon className="h-4 w-4" />}
              />
              <Input
                label="Username"
                placeholder="Enter your username"
                leftIcon={<UserIcon className="h-4 w-4" />}
              />
              <Input
                label="Date"
                type="date"
                leftIcon={<CalendarIcon className="h-4 w-4" />}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Different Tab Styles</h3>
            <Tabs 
              tabs={[
                { label: 'Underline', content: 'Underline style tabs' },
                { label: 'Pills', content: 'Pill style tabs' },
              ]} 
              variant="pills"
            />
          </div>
        </div>
      </section>

      {/* Transition Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Transition Variants</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Fade Transition</h3>
            <FadeTransition show={true}>
              <div className="p-4 bg-green-100 text-green-800 rounded-md text-center">
                Fade Effect
              </div>
            </FadeTransition>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Slide Up Transition</h3>
            <SlideUpTransition show={true}>
              <div className="p-4 bg-blue-100 text-blue-800 rounded-md text-center">
                Slide Up Effect
              </div>
            </SlideUpTransition>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Scale Transition</h3>
            <ScaleTransition show={true}>
              <div className="p-4 bg-purple-100 text-purple-800 rounded-md text-center">
                Scale Effect
              </div>
            </ScaleTransition>
          </div>
        </div>
      </section>
    </div>
  );
}