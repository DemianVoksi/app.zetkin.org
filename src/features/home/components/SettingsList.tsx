import { FC, useState } from 'react';
import { Box } from '@mui/material';

import useUserMutations from '../hooks/useUserMutations';
import { ZetkinUser } from 'utils/types/zetkin';
import messageIds from '../l10n/messageIds';
import { useMessages } from 'core/i18n';
import ZUISection from 'zui/components/ZUISection';
import ZUISelect from 'zui/components/ZUISelect';
import ZUIButton from 'zui/components/ZUIButton';

export type ZetkinLanguage = 'en' | 'sv' | 'da' | 'nn' | 'de' | null;

type SettingListProps = {
  user: ZetkinUser;
};

const SettingsList: FC<SettingListProps> = ({ user }) => {
  const messages = useMessages(messageIds);
  const languageOptions = {
    da: 'Dansk',
    de: 'Deutsch',
    en: 'English',
    nn: 'Norsk',
    sv: 'Svenska',
  } as const;

  const { changeUserLanguage } = useUserMutations();
  const [selectedLanguage, setSelectedLanguage] = useState<ZetkinLanguage>(
    user?.lang as ZetkinLanguage
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      overflow="hidden"
      position="relative"
      sx={{ paddingTop: 1 }}
    >
      <ZUISection
        section={{
          renderContent: () => (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <ZUISelect
                items={[
                  {
                    label: messages.settings.appPreferences.lang.auto(),
                    value: 'auto',
                  },
                  ...Object.entries(languageOptions).map(([code, label]) => ({
                    label,
                    value: code,
                  })),
                ]}
                label={messages.settings.appPreferences.lang.label()}
                onChange={(newLanguage) => {
                  if (newLanguage == 'auto') {
                    setSelectedLanguage(null);
                  } else {
                    setSelectedLanguage(newLanguage as ZetkinLanguage);
                  }
                }}
                selectedOption={selectedLanguage || 'auto'}
              />
              <Box alignSelf="flex-end">
                <ZUIButton
                  disabled={selectedLanguage == user.lang}
                  label={messages.settings.appPreferences.lang.saveButton()}
                  onClick={() => {
                    changeUserLanguage(selectedLanguage);
                    location.reload();
                  }}
                  variant="primary"
                />
              </Box>
            </Box>
          ),
          title: messages.settings.appPreferences.header(),
        }}
      />
    </Box>
  );
};

export default SettingsList;
