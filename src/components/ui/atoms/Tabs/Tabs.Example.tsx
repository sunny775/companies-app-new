import React, { useState } from "react";
import Button from "../Button";
import Tabs from "./index";
import Text from "../Text";

export const TabsExample  = () => {
  const [controlledTab, setControlledTab] = useState<string>("users");

  const handleControlledTabChange = (newValue: string): void => {
    console.log("Controlled tab changed to:", newValue);
    setControlledTab(newValue);
  };

  return (
    <div className="p-6 space-y-10 bg-gray-50 dark:bg-surface">
      <Text variant="h4" as="h1" textGradient>Tabs Examples</Text>
      <div className="mb-10 bg-surface-2 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Basic Uncontrolled Tabs</h2>
        <Tabs defaultValue="tab1" className="w-full max-w-lg">
          <Tabs.Header>
            <Tabs.Tab value="tab1">Home</Tabs.Tab>
            <Tabs.Tab value="tab2">Profile</Tabs.Tab>
            <Tabs.Tab value="tab3">Settings</Tabs.Tab>
          </Tabs.Header>
          <Tabs.Body className="p-1 relative">
            <Tabs.Panel value="tab1">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">Home Tab Content</h3>
                <p className="mt-2">This is the home tab content area with smooth animations.</p>
                <div className="mt-4 bg-blue-600/10 p-4 rounded">
                  <p>Notice how the indicator smoothly transitions between tabs!</p>
                </div>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="tab2">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">Profile Tab Content</h3>
                <p className="mt-2">View and edit your profile information here.</p>
                <div className="mt-4 flex gap-3">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    JD
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                  </div>
                </div>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="tab3">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">Settings Tab Content</h3>
                <p className="mt-2">Adjust your application settings and preferences.</p>
                <div className="mt-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-600/20">
                    <span>Notifications</span>
                    <div className="w-10 h-5 bg-blue-600/50 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-600/20">
                    <span>Dark Mode</span>
                    <div className="w-10 h-5 bg-gray-600/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            </Tabs.Panel>
          </Tabs.Body>
        </Tabs>
      </div>

      {/* Controlled Example */}
      <div className="mb-10 bg-surface-2 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Controlled Tabs</h2>
        <div className="mb-4">
          <p>
            Current active tab: <strong>{controlledTab}</strong>
          </p>
          <div className="flex gap-2 mt-2  px-4 py-6">
            <Button className="active:scale-100" onClick={() => setControlledTab("users")}>
              Set Users Tab
            </Button>
            <Button className="active:scale-100" onClick={() => setControlledTab("groups")}>
              Set Groups Tab
            </Button>
            <Button className="active:scale-100" onClick={() => setControlledTab("permissions")}>
              Set Permissions Tab
            </Button>
          </div>
        </div>

        <Tabs
          value={controlledTab}
          onChange={handleControlledTabChange}
          className="w-full max-w-lg rounded-lg overflow-hidden"
        >
          <Tabs.Header>
            <Tabs.Tab value="users">Users</Tabs.Tab>
            <Tabs.Tab value="groups">Groups</Tabs.Tab>
            <Tabs.Tab value="permissions">Permissions</Tabs.Tab>
          </Tabs.Header>
          <Tabs.Body className="p-4 relative">
            <Tabs.Panel value="users">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">User Management</h3>
                <p className="mt-2">Manage your application users from this panel.</p>
                <div className="mt-4 space-y-2">
                  {["Alice Smith", "Bob Johnson", "Carol Williams"].map((user) => (
                    <div
                      key={user}
                      className="flex items-center justify-between p-2 bg-surface-2 rounded border border-gray-600/20"
                    >
                      <span>{user}</span>
                      <span className="text-xs text-green-500 font-medium">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="groups">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">Group Management</h3>
                <p className="mt-2">Create and manage user groups with specific permissions.</p>
                <div className="mt-4 space-y-2">
                  {["Administrators", "Editors", "Viewers"].map((group) => (
                    <div
                      key={group}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-surface rounded border border-gray-600/20"
                    >
                      <span>{group}</span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-600/10 text-blue-700 px-2 py-1 rounded-full">
                        5 members
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="permissions">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">Permission Settings</h3>
                <p className="mt-2">Configure access control and permission levels.</p>
                <div className="mt-4 space-y-3">
                  {["Read files", "Write files", "Execute files"].map((perm) => (
                    <div key={perm} className="flex items-center">
                      <div className="w-4 h-4 border rounded border-gray-600/20 bg-gray-600/20"></div>
                      <span className="ml-2">{perm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Panel>
          </Tabs.Body>
        </Tabs>
      </div>

      {/* Vertical Example */}
      <div className="mb-10 bg-surface-2 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Vertical Tabs</h2>
        <Tabs
          defaultValue="overview"
          orientation="vertical"
          className="w-full max-w-lg border border-gray-600/20 rounded-lg overflow-hidden flex"
        >
          <Tabs.Header>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="features">Features</Tabs.Tab>
            <Tabs.Tab value="pricing">Pricing</Tabs.Tab>
            <Tabs.Tab value="faq">FAQ</Tabs.Tab>
          </Tabs.Header>
          <Tabs.Body className="p-6 w-2/3 relative">
            <Tabs.Panel value="overview">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">Product Overview</h3>
                <p className="mt-2">A comprehensive overview of our product and its capabilities.</p>
                <div className="mt-4 bg-blue-50 dark:bg-surface p-3 rounded text-blue-800 text-sm">
                  Our product helps thousands of teams collaborate effectively.
                </div>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="features">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">Key Features</h3>
                <p className="mt-2">Explore the powerful features that make our product stand out.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Advanced permissions system
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Real-time collaboration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Powerful integrations
                  </li>
                </ul>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="pricing">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">Pricing Plans</h3>
                <p className="mt-2">Choose the pricing plan that works best for your needs.</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="border rounded p-3">
                    <div className="font-bold">Basic</div>
                    <div className="text-xl mt-1">
                      $10<span className="text-sm text-gray-500">/mo</span>
                    </div>
                  </div>
                  <div className="border rounded p-3 border-blue-500">
                    <div className="font-bold">Pro</div>
                    <div className="text-xl mt-1">
                      $25<span className="text-sm text-gray-500">/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="faq">
              <div className="animate-fadeIn">
                <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                <p className="mt-2">Find answers to commonly asked questions about our product.</p>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="font-medium">How do I get started?</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Sign up for an account and follow our quick start guide.
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Can I cancel anytime?</div>
                    <div className="text-sm text-gray-600 mt-1">Yes, you can cancel your subscription at any time.</div>
                  </div>
                </div>
              </div>
            </Tabs.Panel>
          </Tabs.Body>
        </Tabs>
      </div>
    </div>
  );
};
