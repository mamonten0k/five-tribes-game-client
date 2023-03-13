import { FC, memo } from 'react';

type ProvinceProps = { provinceId: number; points: number };

const Province: FC<ProvinceProps> = ({ provinceId }) => {
  return (
    <button>
      {provinceId}
      <div>Я провинция</div>
    </button>
  );
};

export default memo(Province);
