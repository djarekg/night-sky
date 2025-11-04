import FormCard from '@/components/form-card/form-card.js';
import ContactIcon from '@/components/icons/contact.js';
import MapIcon from '@/components/icons/map.js';
import UserDetailSkeleton from '@/components/user/user-detail-skeleton.js';
import { tokens } from '@/styles/theme.js';
import { Button, Dropdown, Field, Input, makeStyles, Option } from '@fluentui/react-components';
import { Gender, type UserModel } from '@ns/api';
import { type ChangeEvent, type FC, Suspense, useEffect, useState } from 'react';
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

const UserDetail: FC<UserDetailProps> = ({ user = {} as UserModel, onChange }) => {
  const classes = useStyles();
  const fetcher = useFetcher();
  const [userClone, setUserClone] = useState(user);
  const [isDirty, setIsDirty] = useState(false);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setUserClone(prevUser => ({
      ...prevUser,
      [name]: value,
    }));

    onChange?.(userClone);
  };

  useEffect(() => {
    setIsDirty(JSON.stringify(user) !== JSON.stringify(userClone));
  }, [userClone]);

  return (
    <Suspense fallback={<UserDetailSkeleton />}>
      <fetcher.Form className={classes.form}>
        <FormCard
          title="Detail"
          icon={
            <ContactIcon
              size={36}
              strokeWidth={1}
              strokeColor={tokens.colorNeutralCardBackground}
              fill={tokens.colorNeutralForegroundOnBrand}
            />
          }
          layout="grid"
          cols={2}>
          <Field
            label="First name"
            required>
            <Input
              name="firstName"
              value={user.firstName ?? ''}
              onChange={handleInputChange}
            />
          </Field>
          <Field
            label="Last name"
            required>
            <Input
              name="lastName"
              value={user.lastName ?? ''}
              onChange={handleInputChange}
            />
          </Field>
          <Field
            label="Email"
            required>
            <Input
              name="email"
              type="email"
              value={user.email ?? ''}
              onChange={handleInputChange}
            />
          </Field>
          <Field
            label="Phone"
            required>
            <Input
              name="phone"
              type="tel"
              value={user.phone ?? ''}
              onChange={handleInputChange}
            />
          </Field>
          <Field
            label="Gender"
            required>
            <Dropdown
              name="gender"
              placeholder="Select gender"
              value={user.gender ?? ''}>
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
          title="Address"
          icon={
            <MapIcon
              size={36}
              fill={tokens.colorNeutralForegroundOnBrand}
            />
          }>
          <Field
            label="Street address"
            required>
            <Input
              name="streetAddress"
              value={user.streetAddress ?? ''}
              onChange={handleInputChange}
            />
          </Field>
          <Field label="Street address 2">
            <Input
              name="streetAddress2"
              value={user.streetAddress2! ?? ''}
              onChange={handleInputChange}
            />
          </Field>

          <section className={classes.cityStateZip}>
            <Field
              label="City"
              required>
              <Input
                name="city"
                value={user.city ?? ''}
                onChange={handleInputChange}
              />
            </Field>
            <Field
              label="State"
              required>
              {/* <Dropdown placeholder="Select state"></Dropdown> */}
              <Input
                name="stateId"
                value={user.stateId ?? ''}
                onChange={handleInputChange}
              />
            </Field>
            <Field
              label="Zip"
              required>
              <Input
                name="zip"
                value={user.zip! ?? ''}
                onChange={handleInputChange}
              />
            </Field>
          </section>
        </FormCard>

        <footer className={classes.actions}>
          <Button disabled={!isDirty}>Save</Button>
        </footer>
      </fetcher.Form>
    </Suspense>
  );
};

export default UserDetail;
