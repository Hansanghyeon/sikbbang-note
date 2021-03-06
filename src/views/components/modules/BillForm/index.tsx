import React, { useState } from 'react';
import Select from 'react-select';
import type IBill from '@model/Bill';
import { BILLTYPE, FREQUENCYTYPE, FREQUENCY, PER } from '@model/Bill';
import useBill from '@hook/useBill';
import type * as Type from './type';

function BillForm({ onSubmit }: { onSubmit: (e: IBill) => void }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [billType, setBillType] = useState<Type.BillOption | null>(null);
  const [frequencyType, setFrequencyType] = useState<Type.FrequencyTypeOption | null>(null); // 주기 고정,변동
  const [frequency, setFrequency] = useState<Type.FrequencyOption | null>(null); // 주기 일시, 정기
  const [per, setPer] = useState<Type.PerOption | null>(null); // 주기 월,년

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleAmountFoucs = (e: React.FocusEvent<HTMLInputElement>) => {
    if (amount === 0) e.target.select();
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleBillType = (option: Type.BillOption | null) => {
    setBillType(option);
  };

  const handleFrequencyType = (option: Type.FrequencyTypeOption | null) => {
    setFrequencyType(option);
  };

  const handleFrequency = (option: Type.FrequencyOption | null) => {
    setFrequency(option);
  };

  const handlePer = (option: Type.PerOption | null) => {
    setPer(option);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (billType === null || frequencyType === null || frequency === null || per === null) return;
    onSubmit({
      title,
      amount,
      category,
      type: billType.value,
      frequencyType: frequencyType.value,
      frequency: frequency.value,
      per: per.value
    });
  };

  const { total } = useBill({
    amount,
    frequencyType: frequencyType?.value,
    frequency: frequency?.value,
    per: per?.value
  });

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="grid grid-cols-6 gap-[8px] flex-wrap w-[375px] mx-auto">
        <div className="col-span-6">
          <input type="text" className="w-full" placeholder="항목" onChange={handleTitle} value={title ?? ''} />
        </div>
        <div className="col-span-4">
          <input
            type="number"
            className="w-full"
            placeholder="금액"
            onChange={handleAmount}
            value={amount ?? ''}
            onFocus={handleAmountFoucs}
          />
        </div>
        <div className="col-span-2">
          <input type="text" className="w-full" placeholder="범주" onChange={handleCategory} value={category ?? ''} />
        </div>
        <div className="col-span-3">
          <Select
            value={billType}
            onChange={handleBillType}
            options={[
              { value: BILLTYPE.INCOME, label: '수입' },
              { value: BILLTYPE.EXPENSE, label: '지출' }
            ]}
          />
        </div>
        <div className="col-span-3">
          <Select
            value={frequencyType}
            onChange={handleFrequencyType}
            options={[
              { value: FREQUENCYTYPE.FIXED, label: '고정' },
              { value: FREQUENCYTYPE.VARIABLE, label: '변동' }
            ]}
          />
        </div>
        <div className="col-span-3">
          <Select
            value={frequency}
            onChange={handleFrequency}
            options={[
              { value: FREQUENCY.ONCE, label: '일시' },
              { value: FREQUENCY.REGULAR, label: '정기' }
            ]}
          />
        </div>
        <div className="col-span-3">
          <Select
            value={per}
            onChange={handlePer}
            isDisabled={frequency?.value === FREQUENCY.ONCE}
            options={[
              { value: PER.MONTH, label: '월' },
              { value: PER.YEAR, label: '년' }
            ]}
          />
        </div>
        <div className="col-span-6">
          <input type="text" value={total} readOnly className="w-full text-gray-400" placeholder="연 수입 / 연 지출" />
        </div>
        <div className="col-span-6">
          <button type="submit" className="btn py-[8px] w-full rounded-[4px] bg-blue-300">
            제출
          </button>
        </div>
      </div>
    </form>
  );
}

export default BillForm;
