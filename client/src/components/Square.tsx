import React from "react";
import clsx from "clsx";
import { Button, ButtonProps } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faQuestion } from "@fortawesome/free-solid-svg-icons";

export interface SquareProps extends ButtonProps {
  disabled: boolean;
  reveal: boolean;
  isMine: boolean;
  adjacents: number;
  borderBottom?: boolean;
  onClick: React.MouseEventHandler<any>;
}

const Adjacents: React.FC<{
  adjacents: number;
}> = ({ adjacents }) => (
  <strong className="svg-inline--fa fa-w-12">{adjacents}</strong>
);

const Square: React.FC<SquareProps> = ({
  adjacents,
  isMine,
  borderBottom,
  reveal,
  disabled,
  onClick,
}) => {
  const className = clsx({
    "rounded-0": true,
    "border-bottom-0": !borderBottom,
  });
  let content: JSX.Element = <FontAwesomeIcon icon={faQuestion} />;
  if (reveal) {
    content = !isMine ? (
      <Adjacents adjacents={adjacents} />
    ) : (
      <FontAwesomeIcon icon={faBomb} />
    );
  }

  const props = {
    onClick,
    className,
    outline: true,
    disabled: disabled || reveal,
  };
  return <Button {...props}>{content}</Button>;
};

export default Square;
