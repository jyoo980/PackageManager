# TypeScript DSL User Study

Hello, and thank you for agreeing to take part in this smaller user study for a TypeScript DSL.

## General Overview of the Language

ts-dsl is meant to be a quick TS project bootstrapper. It enables developers to create a TypeScript project using a small language. Within the language, you can create directories, define classes, as well as define OOP relations between those classes. We currently have two versions of the language, which are described below.

### Version 1
```
project “project name”
modules [“module 1”, “module 2”, …, “module n”]
dir <STRING>
interface <STRING>
	fields [<TYPE> <STRING>, <TYPE> <STRING>] as private | public | protected
function <async?> <RETURN_TYPE> <STRING>
	params [<TYPE> <STRING>, <TYPE> <STRING>]
  		comment <STRING>
dir <STRING>
class <STRING> implements | extends <STRING> with [getter, setter, test]
		fields [<TYPE> <STRING>, <TYPE> <STRING>] as private | public | protected
```

### Version 2
```
project <STRING> | [<STRING>, <STRING>, ...]
modules [<STRING> (“, <STRING>)*]
dir [<STRING>, <STRING>]
interface “interface name” in <STRING>
	fields [<TYPE> <STRING>, <TYPE> <STRING>] as private | public | protected
	function <async?> <RETURN_TYPE> <STRING>
		params [<TYPE> <STRING>, <TYPE> <STRING>]
  		comment <STRING>
class <STRING> implements | extends <STRING>
	fields [<TYPE> <STRING>, <TYPE> <STRING>] as private | public | protected
	function <async?> <RETURN_TYPE> <STRING> with [getter, setter, test]
		params [<TYPE> <STRING>, <TYPE> <STRING>]
  		comment <STRING>
```

## Your Task

You will use both v1 and v2 of our language to create the project structure for this repository. Namely, you should
replicate the structure/classes of the `src` package. There are a number of things to be mindful of, which are listed below

1. Do _not_ worry about the implementation of the methods - our language currently only supports method stubs.
2. When you use the language to declare dependencies, just pretend like only the following are required/used:
 `ts-node, fs-extra, typescript`.
