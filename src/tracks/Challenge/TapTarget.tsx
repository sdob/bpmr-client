import React, { Fragment } from 'react';
import CircularProgressbar from "react-circular-progressbar";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons/faRedoAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TAPS_NEEDED } from "../constants";

interface Props {
  onTap: (_: any) => void;
  finished: boolean;
  percentage: number;
  timestamps: number[];
}

export default function TapTarget({ finished, onTap, percentage, timestamps }: Props) {
  return (
    <div>
      <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {timestamps.length < TAPS_NEEDED && (
          <Fragment>
            <div
              className="TapTarget"
              onClick={onTap}
              style={{ borderRadius: '50%' }}
            >
              <CircularProgressbar
                strokeWidth={5}
                styles={{
                  path: { transition: 'stroke-dashoffset 0.1s ease 0s', strokeLinecap: 'square', stroke: '#e14594' },
                  text: { fill: '#fff', cursor: 'pointer', userSelect: 'none' }
                }}
                percentage={percentage}
                text={`${Math.round(percentage)}`}
              />
            </div>
          </Fragment>
        )}
        {finished && (
          <div style={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={faRedoAlt} size="lg" spin />
          </div>
        )}
      </div>
    </div>
  );
}