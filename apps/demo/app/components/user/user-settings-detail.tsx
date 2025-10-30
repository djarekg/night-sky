import FormCard from '@/components/form-card/form-card.js';
import { Button, Dropdown, Field, Input, makeStyles, Option } from '@fluentui/react-components';
import { Gender, type UserModel } from '@ns/api';
import { type FC } from 'react';
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
  cityStateZip: {
    display: 'grid',
    gridTemplateColumns: '33% 32% 10%',
    gap: '15px',
  },
});

type UserSettingsDetailProps = {
  user: UserModel;
};

const UserSettingsDetail: FC<UserSettingsDetailProps> = ({ user }) => {
  const classes = useStyles();
  const fetcher = useFetcher();

  const {
    firstName,
    lastName,
    email,
    phone,
    gender,
    streetAddress,
    streetAddress2,
    city,
    stateId,
    zip,
  } = user;
  return (
    <fetcher.Form className={classes.form}>
      <FormCard
        title="Detail"
        layout="grid"
        cols={2}>
        <Field label="First name">
          <Input value={firstName} />
        </Field>
        <Field label="Last name">
          <Input value={lastName} />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            value={email}
          />
        </Field>
        <Field label="Phone">
          <Input
            type="tel"
            value={phone}
          />
        </Field>
        <Field label="Gender">
          <Dropdown
            placeholder="Select gender"
            value={gender}>
            {Object.keys(Gender).map(g => (
              <Option
                key={g}
                value={g}>
                {g}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </FormCard>

      <FormCard
        title="Credentials"
        layout="grid"
        cols={2}>
        <Field label="Username (email)">
          <Input />
        </Field>
        <Field label="Password">
          <Input type="password" />
        </Field>
      </FormCard>

      <FormCard title="Address">
        <Field label="Street address">
          <Input value={streetAddress} />
        </Field>
        <Field label="Street address 2">
          <Input value={streetAddress2!} />
        </Field>

        <section className={classes.cityStateZip}>
          <Field label="City">
            <Input value={city} />
          </Field>
          <Field label="State">
            {/* <Dropdown placeholder="Select state"></Dropdown> */}
            <Input value={stateId} />
          </Field>
          <Field label="Zip">
            <Input value={zip!} />
          </Field>
        </section>
      </FormCard>

      <footer className={classes.actions}>
        <Button>Edit</Button>
      </footer>
    </fetcher.Form>
  );
};

export default UserSettingsDetail;
