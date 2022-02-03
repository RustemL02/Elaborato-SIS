var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as FileSystem from 'fs';
import * as FilePromises from 'fs/promises';
export class Source {
    /**
     *
     * @param path
     * @param excl
     */
    constructor(srcPath, outPath, excluded = []) {
        /**
         *
         */
        this.m_srcPath = '';
        /**
         *
         */
        this.m_outPath = '';
        /**
         *
         */
        this.m_excluded = [];
        this.m_srcPath = srcPath;
        this.m_outPath = outPath;
        this.m_excluded = excluded;
    }
    /**
     *
     * @param path
     * @returns
     */
    searchFolders(path = this.m_srcPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = yield FilePromises.stat(path);
            let dirs = [];
            if (info.isDirectory() && !this.m_excluded.includes(path)) {
                dirs = (yield FilePromises.readdir(path))
                    .map((item) => {
                    return [path, item];
                });
                for (let item of dirs) {
                    let name = `${item[0]}/${item[1]}`;
                    dirs = [...dirs,
                        ...yield this.searchFolders(name)
                    ];
                }
            }
            return dirs;
        });
    }
    /**
     *
     * @param onChange
     */
    watchFiles(ext, onChange) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = yield this.searchFolders();
            let tim;
            for (let item of arr) {
                FileSystem.watch(item[0], (e, fileName) => {
                    if (fileName.includes(ext) && !tim) {
                        tim = setTimeout(() => {
                            tim = null;
                            onChange(item[0], this.m_outPath, fileName);
                        }, 1500);
                    }
                });
            }
        });
    }
    /**
     *
     * @param path
     */
    setSourcePath(path) {
        this.m_srcPath = path;
    }
    /**
     *
     * @returns
     */
    sourcePath() {
        return this.m_srcPath;
    }
    /**
     *
     * @param path
     */
    setOutputPath(path) {
        this.m_outPath = path;
    }
    /**
     *
     * @returns
     */
    outputPath() {
        return this.m_outPath;
    }
    /**
     *
     * @param excl
     */
    setExcluded(excluded) {
        this.m_excluded = excluded;
    }
    /**
     *
     * @param excl
     */
    addExcluded(excluded) {
        this.m_excluded = [
            ...this.m_excluded,
            ...excluded
        ];
    }
    /**
     *
     * @returns
     */
    excluded() {
        return this.m_excluded;
    }
}
;
