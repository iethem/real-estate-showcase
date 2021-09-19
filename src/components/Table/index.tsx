import { ReactNode } from "react";
import { useTable } from "./useTable";

interface Props {
  children: ReactNode;
  onClick?: (args: any) => any;
}

const Table = ({ children, ...rest }: Props) => {
  return <table {...rest}>{children}</table>;
};

Table.Head = ({ children, ...rest }: Props) => {
  return <thead {...rest}>{children}</thead>;
};

Table.Body = ({ children, ...rest }: Props) => {
  return <tbody {...rest}>{children}</tbody>;
};

Table.Foot = ({ children, ...rest }: Props) => {
  return <tfoot {...rest}>{children}</tfoot>;
};

Table.Column = ({ children, ...rest }: Props) => {
  return <th {...rest}>{children}</th>;
};

Table.Row = ({ children, onClick, ...rest }: Props) => {
  return (
    <tr onClick={onClick} {...rest}>
      {children}
    </tr>
  );
};

Table.Cell = ({ children, ...rest }: Props) => {
  return <td {...rest}>{children}</td>;
};

Table.useTable = useTable;

export default Table;
