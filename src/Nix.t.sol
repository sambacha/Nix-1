pragma solidity ^0.8.6;

import "ds-test/test.sol";

import "./Nix.sol";

contract NixTest is DSTest {
    Nix nix;

    function setUp() public {
        nix = new Nix();
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
