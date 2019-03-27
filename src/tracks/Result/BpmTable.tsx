import React from 'react';

interface Props {
  bpm: number;
  trueBpm: number;
}

export default function BpmTable({ bpm, trueBpm }: Props) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Your BPM</td>
          <td>
            {bpm.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td>
            True BPM
          </td>
          <td>
            {trueBpm.toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>

  );
}