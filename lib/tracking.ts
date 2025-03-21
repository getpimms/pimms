import { sendGTMEvent } from "@next/third-parties/google";
import posthog from "posthog-js";
import { v4 as uuidv4 } from "uuid";

const userData = (email: string | undefined) => {
  return {
    customer_details: {
      email,
    },
  };
};

const trackLead = async (
  eventName: string,
  customerData?: {
    externalId?: string;
    customerName?: string;
    customerEmail?: string;
    customerAvatar?: string;
    metadata?: Record<string, any>;
  }
) => {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        externalId: uuidv4(),
        ...customerData,
      }),
    });

    if (!response.ok) {
      console.error("Failed to track lead:", response);
      return;
    }

    return await response.json();
  } catch (error) {
    console.error("Error tracking lead:", error);
  }
};

export const trackEvent = (name: string, data: any, email?: string) => {
  // phEvent(name, email, data, {
  //   send_instantly: true,
  // });

  gtmEvent(name, email, data);

  trackLead(name, {
    customerEmail: email,
    metadata: data,
  });
};

export const phEvent = (
  event: string,
  email?: string,
  data: any = {},
  options: any = {}
) => {
  posthog.capture(
    event,
    {
      ...data,
      ...{ ...userData(email) },
    },
    { ...options }
  );
};

export const gtmEvent = (event: string, email?: string, data: any = {}) => {
  sendGTMEvent({
    event,
    ...{ ...userData(email), ...data },
  });
};
