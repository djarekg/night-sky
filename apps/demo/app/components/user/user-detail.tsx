import FormCard from '@/components/form-card/form-card.js';
import {
  Button,
  Dropdown,
  Field,
  Input,
  makeStyles,
  Option,
  tokens,
} from '@fluentui/react-components';
import { Gender, type UserModel } from '@ns/api';
import { type ChangeEvent, type FC, useState } from 'react';
import { useFetcher } from 'react-router';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXXL,
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

type UserDetailProps = {
  user: UserModel;
  onChange?: (user: UserModel) => void;
};

const UserDetail: FC<UserDetailProps> = ({ user, onChange }) => {
  const classes = useStyles();
  const fetcher = useFetcher();
  const [userClone, setUserClone] = useState(user);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setUserClone(prevUser => ({
      ...prevUser,
      [name]: value,
    }));

    onChange?.(userClone);
  };

  return (
    <fetcher.Form className={classes.form}>
      <FormCard
        title="Detail"
        layout="grid"
        cols={2}>
        <Field
          label="First name"
          required>
          <Input
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
        </Field>
        <Field
          label="Last name"
          required>
          <Input
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
        </Field>
        <Field
          label="Email"
          required>
          <Input
            name="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </Field>
        <Field
          label="Phone"
          required>
          <Input
            name="phone"
            type="tel"
            value={user.phone}
            onChange={handleInputChange}
          />
        </Field>
        <Field
          label="Gender"
          required>
          <Dropdown
            name="gender"
            placeholder="Select gender"
            value={user.gender}>
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

      <FormCard title="Address">
        <Field
          label="Street address"
          required>
          <Input
            name="streetAddress"
            value={user.streetAddress}
            onChange={handleInputChange}
          />
        </Field>
        <Field label="Street address 2">
          <Input
            name="streetAddress2"
            value={user.streetAddress2!}
            onChange={handleInputChange}
          />
        </Field>

        <section className={classes.cityStateZip}>
          <Field
            label="City"
            required>
            <Input
              name="city"
              value={user.city}
              onChange={handleInputChange}
            />
          </Field>
          <Field
            label="State"
            required>
            {/* <Dropdown placeholder="Select state"></Dropdown> */}
            <Input
              name="stateId"
              value={user.stateId}
              onChange={handleInputChange}
            />
          </Field>
          <Field
            label="Zip"
            required>
            <Input
              name="zip"
              value={user.zip!}
              onChange={handleInputChange}
            />
          </Field>
        </section>
      </FormCard>

      <footer className={classes.actions}>
        <Button>Save</Button>
      </footer>
    </fetcher.Form>
  );
};

export default UserDetail;
