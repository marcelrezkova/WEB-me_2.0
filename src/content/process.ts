export type Step = { n: string; title: string; body: string };
export const steps: Step[] = [
  { n: '01', title: 'Validate with data', body: 'Market and pricing data first; an idea only survives if the numbers do.' },
  { n: '02', title: 'Specify and plan', body: 'Design spec, decomposition into independent tasks, explicit interfaces.' },
  { n: '03', title: 'Build with agents, review with agents', body: 'Implementation by orchestrated agents, every task reviewed for spec compliance and code quality before merge.' },
  { n: '04', title: 'Ship and measure', body: 'Automated deploys, event-driven monitoring, iterate on what the data says.' },
];
export const processLine = 'Creative when there is room to explore, decisive when I know what I am holding, and always anchored in data.';
