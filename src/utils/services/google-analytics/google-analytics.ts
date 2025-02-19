/*
  Analytics

  Manages analytics events through generic methods

  Methods:
    gaNavHoverEvent specifically used for pushing navigation events on based on member action
      - [label][required]: String

    gaNavClickEvent specifically used for pushing navigation events on based on member action
      - [label][required]: String     

    genericPushEvent used for pushing custom context object to GA
      -  [context][required]: Object
*/

declare const window: any;

export const gaNavHoverEvent = (label: string) => {
  genericPushEvent({
    event: 'DLevent.memberNavigation',
    memberNavigation: `Hover-${label}`
  });
};

export const gaNavClickEvent = (label: string) => {
  genericPushEvent({
    event: 'DLevent.memberNavigation',
    memberNavigation: `Click-${label}`
  });
};
export const genericMemberNavigation = (
  actionName: string,
  eventName = 'DLevent.memberNavigation'
) => {
  window.dataLayer?.push({
    event: eventName,
    memberNavigation: actionName
  });
};
export const genericPushEvent = (context: any) => {
  if (Object.keys(context).length !== 0) {
    window.dataLayer?.push(context);
  }
};
