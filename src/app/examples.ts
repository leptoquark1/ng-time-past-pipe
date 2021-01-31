export interface Example {
  label: string;
  source?: string;
  value: any;
}

export function getOutputExamples(): Example[] {
  return [
    {
      label: 'Below 5 seconds',
      value: new Date().toISOString(),
    },
    {
      label: 'Under 59 seconds',
      value: new Date(Date.now() - (30 * 1000)).toISOString(),
    },
    {
      label: 'Under 90 seconds',
      value: new Date(Date.now() - (61 * 1000)).toISOString(),
    },
    {
      label: 'Under 45 Minutes',
      value: new Date(Date.now() - (20 * 60 * 1000)).toISOString(),
    },
    {
      label: 'Under 90 Minutes',
      value: new Date(Date.now() - (60 * 60 * 1000)).toISOString(),
    },
    {
      label: 'Under 22 Hours',
      value: new Date(Date.now() - (16 * 60 * 60 * 1000)).toISOString(),
    },
    {
      label: 'Under 36 Hours',
      value: new Date(Date.now() - (30 * 60 * 60 * 1000)).toISOString(),
    },
    {
      label: 'Under 25 Days',
      value: new Date(Date.now() - (15 * 24 * 60 * 60 * 1000)).toISOString(),
    },
    {
      label: 'Under 45 Days',
      value: new Date(Date.now() - (40 * 24 * 60 * 60 * 1000)).toISOString(),
    },
    {
      label: 'Under 356 Days',
      value: new Date(Date.now() - (220 * 24 * 60 * 60 * 1000)).toISOString(),
    },
    {
      label: 'Under 545 Days',
      value: new Date(Date.now() - (400 * 24 * 60 * 60 * 1000)).toISOString(),
    },
    {
      label: 'More than 545 Days',
      value: new Date(Date.now() - (900 * 24 * 60 * 60 * 1000)).toISOString(),
    },
  ];
}

export function getDataSourcesExamples(): Example[] {
  return [
    {
      label: 'ES3 Date objects',
      source: 'new Date()',
      value: new Date(),
    },
    {
      label: 'ISO (8601) String',
      value: (new Date()).toISOString(),
    },
    {
      label: 'Numeric Value (milliseconds)',
      value: Date.now(),
    },
    {
      label: 'Numeric Value (seconds)',
      value: Math.floor(Date.now() / 1000),
    },
  ];
}

export function getFallbackExamples(): Example[] {
  return [
    {
      label: 'Some time in the Future',
      value: Math.floor(Date.now() / 1000) + 2676648,
    },
  ];
}
