import * as vscode from "vscode";
import { assert } from "chai";
import * as sinon from "sinon";
import DataConverter from "../../dataConverter";
import * as mock from "../mock/dataConverter.mock";
import Utils from "../../utils";
import {
  getUtilsStub,
  getWorkspaceData,
  getDocumentSymbolItemSingleLine,
  getDocumentSymbolItemMultiLine,
  getDocumentSymbolQpItemMultiLine,
  getItems,
  getQpItems,
  getItem,
  getQpItem,
} from "../util/mockFactory";

describe("DataConverter", () => {
  let dataConverter: DataConverter;
  let dataConverterAny: any;
  let utilsStub: Utils;

  before(() => {
    utilsStub = getUtilsStub();
    dataConverter = new DataConverter(utilsStub);
  });

  beforeEach(() => {
    dataConverterAny = dataConverter as any;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("constructor", () => {
    it("should data converter be initialized", () => {
      dataConverter = new DataConverter(utilsStub);

      assert.exists(dataConverter);
    });
  });

  describe("convertToQpData", () => {
    it("should return quick pick data", () => {
      const items = getItems();
      assert.deepEqual(
        dataConverter.convertToQpData(getWorkspaceData(items)),
        getQpItems()
      );
    });

    it("should return empty array", () => {
      assert.deepEqual(dataConverter.convertToQpData(getWorkspaceData()), []);
    });
  });

  describe("mapDataToQpData", () => {
    it("should return quick pick data", () => {
      const items = getItems();
      assert.deepEqual(
        dataConverterAny.mapDataToQpData(getWorkspaceData(items).items),
        getQpItems()
      );
    });

    it("should return empty array", () => {
      assert.deepEqual(
        dataConverterAny.mapDataToQpData(getWorkspaceData().items),
        []
      );
    });
  });

  describe("mapItemElementToQpItem", () => {
    it("should return quick pick item by invoking mapDocumentSymbolToQpItem method", () => {
      assert.deepEqual(
        dataConverterAny.mapItemElementToQpItem(
          getItem(),
          getDocumentSymbolItemSingleLine()
        ),
        mock.qpItemDocumentSymbolSingleLine
      );
    });

    it("should return quick pick item by invoking mapUriToQpItem method", () => {
      assert.deepEqual(
        dataConverterAny.mapItemElementToQpItem(getItem(), getItem()),
        getQpItem()
      );
    });
  });

  describe("mapDocumentSymbolToQpItem", () => {
    it("should return quick pick item for single line document symbol", () => {
      assert.deepEqual(
        dataConverterAny.mapDocumentSymbolToQpItem(
          getItem(),
          getDocumentSymbolItemSingleLine()
        ),
        mock.qpItemDocumentSymbolSingleLine
      );
    });

    it("should return quick pick item for multi line document symbol with parent", () => {
      assert.deepEqual(
        dataConverterAny.mapDocumentSymbolToQpItem(
          getItem(),
          getDocumentSymbolItemMultiLine()
        ),
        getDocumentSymbolQpItemMultiLine()
      );
    });

    it("should return quick pick item for multi line document symbol with empty parent", () => {
      assert.deepEqual(
        dataConverterAny.mapDocumentSymbolToQpItem(
          getItem(),
          getDocumentSymbolItemMultiLine(true)
        ),
        getDocumentSymbolQpItemMultiLine(true)
      );
    });
  });

  describe("mapUriToQpItem", () => {
    it("should return quick pick item", () => {
      assert.deepEqual(dataConverterAny.mapUriToQpItem(getItem()), getQpItem());
    });
  });

  describe("normalizeUriPath", () => {
    it("should return uri path without workspace part", () => {
      sinon
        .stub(vscode.workspace, "workspaceFolders")
        .value(mock.workspaceFolders);

      assert.equal(
        dataConverterAny.normalizeUriPath(getItem().fsPath),
        getQpItem().uri!.fsPath
      );
    });
  });

  describe("getWorkspaceFoldersPaths", () => {
    it("should return array with two strings", () => {
      sinon
        .stub(vscode.workspace, "workspaceFolders")
        .value(mock.workspaceFolders);
      const workspaceFoldersPaths = dataConverterAny.getWorkspaceFoldersPaths();
      const expected = [
        vscode.Uri.file("/test/path/to/workspace").fsPath,
        vscode.Uri.file("/test2/path2/to2/workspace2").fsPath,
      ];

      assert.deepEqual(workspaceFoldersPaths, expected);
    });
  });
});