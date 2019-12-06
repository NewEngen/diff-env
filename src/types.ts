export type TPossibleKeys = 'missing' | 'unset';

export type TMissingKeys = {
  missing: string[];
  unset: string[];
}

export type TConfig = {
  [key: string]: string;
}

export type TTableConfig = {
  parameter: string;
  value: string;
  status: string;
}
