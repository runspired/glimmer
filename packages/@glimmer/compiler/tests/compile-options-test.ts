import { TemplateMeta } from '../../wire-format';
import { precompile } from "../";

QUnit.module('precompile');

QUnit.module('Compile options', {
  beforeEach() {
    env = new TestEnvironment();
  }
});

QUnit.test('moduleName option is passed into meta', assert => {
  let moduleName = 'It ain\'t hard to tell';
  let template = compile('Hi, {{name}}!', {
    env,
    meta: {
      moduleName
    }
  });
  assert.equal(template.meta.moduleName, moduleName, 'Template has the moduleName');
});

QUnit.module('precompile', {
  beforeEach() {
    env = new TestEnvironment();
  }
});

QUnit.test('returned meta is correct', assert => {
  let wire = JSON.parse(precompile('Hi, {{name}}!', {
    meta: {
      "<template-meta>": true,
      moduleName: 'my/module-name',
      metaIsOpaque: 'yes'
    }
  }));

  assert.equal(wire.meta.moduleName, 'my/module-name', 'Template has correct meta');
  assert.equal(wire.meta.metaIsOpaque, 'yes', 'Template has correct meta');
});
