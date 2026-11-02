import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseAccordionValue } from '../src/features/site-templates/catalog/scissor/components/useQueryAccordion.ts'
import { templateHref } from '../src/features/site-templates/catalog/scissor/config.ts'

test('服务与 FAQ 深链接按各自前缀和集合长度解析', () => {
  assert.equal(parseAccordionValue(null, 's', 4), 0)
  assert.equal(parseAccordionValue('s4', 's', 4), 3)
  assert.equal(parseAccordionValue('S2', 's', 4), 1)
  assert.equal(parseAccordionValue('q6', 'q', 6), 5)
  assert.equal(parseAccordionValue('s4', 's', 3), null)
})

test('关闭状态、无效参数与空集合不会隐式展开其他项目', () => {
  for (const value of ['', 'q1', 's0', 's-1', 's1x', 's01', 's99999999999999999']) {
    assert.equal(parseAccordionValue(value, 's', 4), null, value)
  }
  assert.equal(parseAccordionValue(null, 's', 0), null)
  assert.equal(parseAccordionValue('s1', 's', 0), null)
})

test('独立站和宿主站的分区导航始终指向端首页', () => {
  assert.equal(templateHref('', '#studio'), '/#studio')
  assert.equal(templateHref('/en', '#reviews'), '/en#reviews')
  assert.equal(templateHref('/templates/scissor/site/en', '#faq'), '/templates/scissor/site/en#faq')
  assert.equal(templateHref('/templates/scissor/site', 'stylists/priya-shah'), '/templates/scissor/site/stylists/priya-shah')
})
