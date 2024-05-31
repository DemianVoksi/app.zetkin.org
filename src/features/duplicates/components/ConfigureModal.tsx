import React from 'react';
import theme from 'theme';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import { FC, useState } from 'react';

import FieldSettings from './FieldSettings';
import messageIds from '../l10n/messageIds';
import { PotentialDuplicate } from '../store';
import PotentialDuplicatesLists from './PotentialDuplicatesLists';
import useDuplicatesMutations from '../hooks/useDuplicatesMutations';
import useFieldSettings from '../hooks/useFieldSettings';
import { useMessages } from 'core/i18n';
import { useNumericRouteParams } from 'core/hooks';
import { ZetkinPerson } from 'utils/types/zetkin';

interface ConfigureModalProps {
  potentialDuplicate: PotentialDuplicate;
  onClose: () => void;
  open: boolean;
}

const ConfigureModal: FC<ConfigureModalProps> = ({
  potentialDuplicate,
  open,
  onClose,
}) => {
  const { orgId } = useNumericRouteParams();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const messages = useMessages(messageIds);
  const { mergeDuplicate } = useDuplicatesMutations(orgId);

  const [selectedIds, setSelectedIds] = useState<number[]>(
    potentialDuplicate?.duplicates.map((person) => person.id) ?? []
  );

  const peopleToMerge = potentialDuplicate?.duplicates.filter((person) =>
    selectedIds.includes(person.id)
  );

  const peopleNoToMerge = potentialDuplicate?.duplicates.filter(
    (person) => !selectedIds.includes(person.id)
  );

  const { fieldValues, initialOverrides } = useFieldSettings(peopleToMerge);
  const [overrides, setOverrides] = useState(initialOverrides);

  return (
    <Dialog fullScreen={fullScreen} maxWidth={'lg'} open={open}>
      <DialogTitle variant="h5">{messages.modal.title()}</DialogTitle>
      <Box display="flex" flexGrow={1} overflow="hidden">
        <Box
          display="flex"
          flexDirection="column"
          sx={{ overflowY: 'auto' }}
          width="50%"
        >
          <PotentialDuplicatesLists
            onDeselect={(person: ZetkinPerson) => {
              const filteredIds = selectedIds.filter(
                (item) => item !== person.id
              );
              setSelectedIds(filteredIds);
            }}
            onSelect={(person: ZetkinPerson) => {
              const selectedIdsUpdated = [...selectedIds, person.id];
              setSelectedIds(selectedIdsUpdated);
            }}
            peopleNoToMerge={peopleNoToMerge}
            peopleToMerge={peopleToMerge}
          />
        </Box>
        <Box display="flex" flexDirection="column" marginRight={2} width="50%">
          <FieldSettings
            fieldValues={fieldValues}
            onChange={(field, value) => {
              setOverrides({ ...overrides, [`${field}`]: value });
            }}
          />
          <Box marginBottom={2} />
          <Alert severity="info">
            <AlertTitle>{messages.modal.infoTitle()}</AlertTitle>
            {messages.modal.infoMessage()}
          </Alert>
        </Box>
      </Box>
      <DialogActions>
        <Button
          onClick={() => {
            setSelectedIds(
              potentialDuplicate?.duplicates.map((person) => person.id) ?? []
            );
            onClose();
          }}
          variant="text"
        >
          {messages.modal.cancelButton()}
        </Button>
        <Button
          disabled={selectedIds.length > 1 ? false : true}
          onClick={() =>
            mergeDuplicate(potentialDuplicate.id, selectedIds, overrides)
          }
          variant="contained"
        >
          {messages.modal.mergeButton()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigureModal;
