import { useRef } from 'react';

type Props = { 
  type: HTMLInputElement['type'];
  id: HTMLInputElement['id'];
};

export const useUncrontrolledField = ({ type, id, ...rest }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return {
    type,
    ref,
    id,
    name: id,
  };
};
