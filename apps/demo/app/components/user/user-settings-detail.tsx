import FormCard from '@/components/form-card/form-card.js';
import { Button, Field, Input, makeStyles } from '@fluentui/react-components';
import type { UserModel } from '@ns/api';
import type { FC } from 'react';
import { useFetcher } from 'react-router';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    inlineSize: '50%',
  },
  actions: {
    display: 'flex',
    justifyContent: 'end',
  },
});

type UserSettingsDetailProps = {
  user: UserModel;
};

const UserSettingsDetail: FC<UserSettingsDetailProps> = ({ user }) => {
  const classes = useStyles();
  const fetcher = useFetcher();

  const { firstName, lastName } = user;
  return (
    <fetcher.Form className={classes.form}>
      <FormCard title="Name">
        <Field label="First name">
          <Input value={firstName} />
        </Field>
        <Field label="Last name">
          <Input value={lastName} />
        </Field>
      </FormCard>

      <FormCard title="Credentials">
        <Field label="Username (email)">
          <Input />
        </Field>
        <Field label="Password">
          <Input type="password" />
        </Field>
      </FormCard>

      <footer className={classes.actions}>
        <Button>Edit</Button>
      </footer>
    </fetcher.Form>
  );
};

export default UserSettingsDetail;
