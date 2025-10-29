import { isNullOrEmpty } from '@/core/utils/string.js';
import {
  Link,
  Toast,
  ToastBody,
  Toaster,
  ToastFooter,
  ToastTitle,
  useToastController,
} from '@fluentui/react-components';
import { useEffect, useId, useMemo, type FC } from 'react';

type ErrorNotifierProps = {
  message: string;
};

const ErrorNotifier: FC<ErrorNotifierProps> = ({ message }) => {
  const toasterId = useId();
  const { dispatchToast } = useToastController();
  const notify = () =>
    useMemo(
      () =>
        dispatchToast(
          <Toast appearance="inverted">
            <ToastTitle action={<Link>Copy</Link>}>Error</ToastTitle>
            <ToastBody subtitle="Subtitle">{message}</ToastBody>
            <ToastFooter>
              <Link>Dismiss</Link>
            </ToastFooter>
          </Toast>,
          { intent: 'error' }
        ),
      [message]
    );

  useEffect(() => {
    if (!isNullOrEmpty(message)) {
      notify();
    }
  }, [message]);

  return (
    <Toaster
      toasterId={toasterId}
      pauseOnHover
    />
  );
};

export default ErrorNotifier;
