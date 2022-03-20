import PropTypes from 'prop-types';

// api
import { env } from 'api/'

// libs
import MailchimpSubscribe from 'react-mailchimp-subscribe';

// blocks
import NewsletterForm from './NewsletterForm';


const storageKey = 'mailChimpForm'


const NewsletterSubscribe = (props) => {

  const MAILCHIMP_URL = env.credentials.MAILCHIMP.url
  const MAILCHIMP_CUSTOM_FIELDS = env.credentials.MAILCHIMP.customFields.SITE

  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={(payload) => {
        const { subscribe, status, message } = payload || {};
        return (
          <NewsletterForm
            customFields={MAILCHIMP_CUSTOM_FIELDS}
            status={status}
            message={message}
            onSuccess={props.onSuccess}
            onError={props.onError}
            onValidated={(formData) => subscribe(formData)}
            storageKey={storageKey}
          />
        );
      }}
    />
  );
};

NewsletterSubscribe.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}

NewsletterSubscribe.storageKey = storageKey

export default NewsletterSubscribe;
