import React from 'react';
import { OrganizationProfile } from '@clerk/nextjs';

const SettingsPage = () => {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: 'none',
              width: '100%',
              height: '100%',
              padding: '0',
              overflow: 'hidden',
            },
            card: {
              boxShadow: 'none',
              width: '100%',
              height: '100%',
              padding: '1rem',
              overflow: 'hidden',
            },
            navbar: {
              boxShadow: 'none',
              width: '100%',
            },
            pageScrollBox: {
              boxShadow: 'none',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            },
            page: {
              transform: 'scale(0.75)',
              transformOrigin: 'top left',
            },
            formFieldInput: {
              fontSize: '0.875rem',
            },
            formButtonPrimary: {
              fontSize: '0.875rem',
              padding: '0.5rem 1rem',
            },
            formFieldLabel: {
              fontSize: '0.75rem',
            },
          },
          layout: {
            socialButtonsVariant: 'iconButton',
            socialButtonsPlacement: 'bottom',
          },
        }}
      />
    </div>
  );
};

export default SettingsPage;