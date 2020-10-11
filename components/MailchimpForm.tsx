import React, { useState } from 'react';
import { LoaderIcon } from '@tabetalt/kit';
import { useMailchimp } from 'react-use-mailchimp';
import { Alert, Button, Checkbox, Field, Flex, Label, Text } from 'theme-ui';

const url =
  'https://tabetalt.us4.list-manage.com/subscribe/post?u=dfea72ea8ea1dd777ea638f05&amp;id=48447e91e7';

const MailchimpForm = () => {
  const [accepted, setAccepted] = useState(false);
  const [email, setEmail] = useState('');
  const [mailchimp, subscribe, reset] = useMailchimp({
    url,
  });
  const { loading, error, data } = mailchimp;
  return (
    <>
      <h2>Sign up for our newsletter</h2>
      <p>
        We love to share updates, tips and tricks. We promise not to spam down
        your inbox, and most importantly not share these details to anyone!
      </p>
      <Field
        sx={{ mb: '30px' }}
        label="Your email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="eg. tom.johnson@google.com"
      />
      <p>
        We are obliged to make sure you accept that we store your email address,
        to advertise, send updates, tips and tricks. You can read our privacy
        terms <a href="https://tabetalt.no/index.php/personvern/">here</a>.
      </p>
      <Label>
        <Checkbox checked={accepted} onClick={() => setAccepted(!accepted)} />I
        accept that Tabetalt stores my email address
      </Label>
      {accepted && email && (
        <Button
          sx={{
            mt: '30px',
            color: 'var(--ifm-background-color)',
          }}
          type="submit"
          onClick={() =>
            subscribe({
              EMAIL: email,
            })
          }
        >
          <Flex sx={{ alignItems: 'center' }}>
            <Text>Subscribe to our newsletter</Text>
            {loading && <LoaderIcon sx={{ ml: '10px' }} height={20} />}
          </Flex>
        </Button>
      )}
      {data && data.result === 'success' && (
        <Text dangerouslySetInnerHTML={{ __html: data.msg }} />
      )}
      {error && <Alert dangerouslySetInnerHTML={{ __html: data.msg }} />}
    </>
  );
};

export default MailchimpForm;
