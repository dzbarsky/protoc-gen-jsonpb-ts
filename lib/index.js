"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var config_1 = require("./config");
var plugin_pb_1 = require("google-protobuf/google/protobuf/compiler/plugin_pb");
var process = require("process");
var ejs = require("ejs");
var fs = require("fs");
var path = require("path");
var helper_1 = require("./ts/helper");
var export_map_1 = require("./export-map");
var prettier = require("prettier");
require("../vendor/google/api/annotations_pb");
utils_1.read()
    .then(function (buffer) {
    var input = new Uint8Array(buffer.length);
    input.set(buffer);
    var request = plugin_pb_1.CodeGeneratorRequest.deserializeBinary(input);
    var response = new plugin_pb_1.CodeGeneratorResponse();
    var config = config_1.Config.initWithCLIOptions(request.getParameter());
    var map = new export_map_1.ExportMap();
    var helper = new helper_1.TSHelper(config, map);
    request.getProtoFileList().forEach(function (descriptor) {
        map.addProto(descriptor);
    });
    request.getFileToGenerateList().forEach(function (filename) {
        var file = new plugin_pb_1.CodeGeneratorResponse.File();
        var templatePath = path.resolve(__dirname, "../templates/ts/proto.ejs");
        var template = fs.readFileSync(templatePath, {
            encoding: "utf-8"
        });
        var output = ejs.render(template, {
            proto: map.getProto(filename).toObject(),
            helper: helper,
            config: config.asObject
        }, {
            root: path.resolve(__dirname, "../templates")
        });
        var content = prettier.format(output, { parser: "typescript" });
        file.setName(filename.replace(".proto", "_pb.ts"));
        file.setContent(content);
        response.addFile(file);
    });
    process.stdout.write(Buffer.from(response.serializeBinary()));
})
    .catch(function (error) {
    console.error(error);
    process.exit(2);
});
