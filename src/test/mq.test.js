import { mq } from '../components/styles';

test('mq.genResponsiveCss() works for non-responsive inputs', () => {
  const testCases = [
    { inputs: { cssProperty: 'width', cssValue: 50 },
      output: 'width: 50px;' },
    { inputs: { cssProperty: 'width', cssValue: '50%' },
      output: 'width: 50%;' },
    { inputs: { cssProperty: 'width', cssValue: null },
      output: '' },
    { inputs: { cssProperty: 'width', cssValue: 0 },
      output: 'width: 0px;' },
    { inputs: { cssProperty: 'width', cssValue: 0, forcePixels: false },
      output: 'width: 0;' },
    { inputs: { cssProperty: 'width', cssValue: 'auto' },
      output: 'width: auto;' },
    { inputs: { cssProperty: 'width', cssValue: 'auto', forcePixels: false },
      output: 'width: auto;' }
  ];

  testCases.forEach((testCase) => {
    expect(mq.genResponsiveCss(
      testCase.inputs.cssProperty,
      testCase.inputs.cssValue,
      testCase.inputs.forcePixels
    )).toBe(testCase.output);
  });
});

test('mq.genResponsiveCss() works for responsive inputs', () => {
  const testCases = [
    { inputs: { cssProperty: 'width', cssValue: [25, 50, 75] },
      output: `
        ${mq.desktop('width: 25px;')}
        ${mq.tablet('width: 50px;')}
        ${mq.phone('width: 75px;')}
      ` },
    { inputs: { cssProperty: 'width', cssValue: [25, 50] },
      output: '' },
    { inputs: { cssProperty: 'width', cssValue: [25, 50, null] },
      output: `
        ${mq.desktop('width: 25px;')}
        ${mq.tablet('width: 50px;')}
        ${''}
      ` },
    { inputs: { cssProperty: 'width', cssValue: [null, null, 75] },
      output: `
        ${''}
        ${''}
        ${mq.phone('width: 75px;')}
      ` },
    { inputs: { cssProperty: 'width', cssValue: [0, undefined, ''] },
      output: `
        ${mq.desktop('width: 0px;')}
        ${''}
        ${''}
      ` },
    { inputs: { cssProperty: 'width', cssValue: ['25%', 50, 'inherit'] },
      output: `
        ${mq.desktop('width: 25%;')}
        ${mq.tablet('width: 50px;')}
        ${mq.phone('width: inherit;')}
      ` }
  ];

  testCases.forEach((testCase) => {
    expect(mq.genResponsiveCss(
      testCase.inputs.cssProperty,
      testCase.inputs.cssValue,
      testCase.inputs.forcePixels
    )).toBe(testCase.output);
  });
});
